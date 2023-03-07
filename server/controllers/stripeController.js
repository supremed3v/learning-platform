import stripe from "stripe";
import { User } from "../models/user.js";

const myStripe = stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  if (!user.stripe_account_id) {
    const account = await myStripe.accounts.create({
      type: "custom",
      country: req.body.country,
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      individual: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: user.email,
        phone: req.body.phone,
        address: {
          city: req.body.city,
          country: req.body.country,
          line1: req.body.line1,
          postal_code: req.body.postal_code,
          state: req.body.state,
        },
        dob: {
          day: req.body.day,
          month: req.body.month,
          year: req.body.year,
        },
      },
    });
    user.stripe_account_id = account.id;
    await user.save();
  }

  // create account link based on account id (for frontend to complete onboarding)
  let accountLink = await myStripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  const bankAccount = await myStripe.accounts.createExternalAccount(
    user.stripe_account_id,
    {
      external_account: {
        object: "bank_account",
        country: req.body.country,
        currency: "usd",
        account_holder_name: req.body.account_holder_name,
        account_holder_type: "individual",
        routing_number: req.body.routing_number,
        account_number: req.body.account_number,
      },
    }
  );

  console.log("BANK ACCOUNT => ", bankAccount);

  // pre-fill any info such as email
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });

  console.log("ACCOUNT LINK => ", accountLink);
  res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
};

export const getAccountStatus = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  const account = await myStripe.accounts.retrieve(user.stripe_account_id);

  console.log("USER ACCOUNT RETRIEVE => ", account);

  // update our local user

  res.status(200).json({
    message: "Account status updated",
    stripe_seller: account,
    success: true,
  });
};
