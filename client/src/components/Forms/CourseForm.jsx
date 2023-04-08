import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
const CourseForm = () => {
    const [values, setValues] = React.useState({
        title: '',
        description: '',
        amount: 0,
        category: '',
    })

    const [loading, setLoading] = React.useState(false)

    const [file, setFile] = React.useState({
        file: null
    })
    
    const router = useRouter()
    const onFileChange = (e) => {
        setFile({ file: e.target.files[0] })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('title', values.title)
        formData.set('description', values.description)
        formData.set('amount', values.amount)
        formData.set('category', values.category)
        formData.set('file', file.file)

        console.log(formData.get('title'))


        try {
            setLoading(true)
            const res = await axios.post('http://localhost:3000/api/v1/course/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
            setLoading(false)
            if(res.data.success){
                toast.success(res.data.message + ' Redirecting to courses page...')
            }

            setTimeout(() => {
                router.push('/instructor/courses')
            },[3000])
        } catch(err){
            console.log(err)
            setLoading(false)
            toast.error(err.response.data.message)
        }
    }
  return (
    <div className='flex item-center justify-center'>
      <form className="w-full max-w-sm items-center" onSubmit={handleSubmit} >
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Title
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={
        values.title
      } onChange={handleChange} name='title' />
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Description
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" name="description" value={values.description} onChange={handleChange}
       />
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Category
      </label>
    </div>
    <div className="md:w-2/3">
     <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={values.category} name="category" onChange={handleChange} >
         <option value="Web development" defaultValue={true}
         >Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option  value="Design">Design</option>
     </select>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password" >
        Amount
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number" placeholder="$25.00" name="amount" value={values.amount} onChange={handleChange} />
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
  <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Choose Poster Image
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="file" onChange={onFileChange} />
    </div>
  </div>
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit"
        disabled={loading}
      >
        Sign Up
      </button>
    </div>
  </div>
</form>
    </div>
  )
}

export default CourseForm