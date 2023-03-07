import stripe from "stripe";
import { User } from "../models/user.js";

const myStripe = stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  if (!user.stripe_account_id) {
    const account = await myStripe.accounts.create({
      type: "express",
    });

    console.log("ACCOUNT => ", account);
    user.stripe_account_id = account.id;
    user.save();
  }

  // create account link based on account id (for frontend to complete onboarding)
  let accountLink = await myStripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

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

  res.status(200).json(account);
};
