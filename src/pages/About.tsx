import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

export default function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
          <Title texts={['About', 'US']}/>
          <div className="my-10 flex flex-col md:flex-row gap-16">
            <img className="w-full md:max-w-[450px]" src={assets.about_img}/>
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempore itaque sapiente fugit, laboriosam sed fugiat, facere quibusdam nesciunt vitae perferendis aliquid sunt? Placeat eveniet cum sapiente dolore impedit quae?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laborum possimus consequatur officia rem, fugiat atque accusantium pariatur. Eos dolor hic nisi! Optio eos ratione sapiente aliquid ab amet in!</p>
              <b className="text-gray-800">Our Mission</b>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum delectus ad, blanditiis nostrum dolores culpa unde optio sunt. Eos id molestias quia, adipisci commodi voluptate voluptatem beatae? Culpa, illo delectus.</p>
            </div>
          </div>
          <div className="text-4xl py-4">
            <Title texts={['WHY', 'CHOOSE US']}/>
          </div>
          <div className="flex flex-col md:flex-row text-sm mb-20">
            <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Quality Assurance:</b>
              <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam architecto, veritatis molestias eveniet animi reiciendis consequuntur praesentium magnam officia iure fugit illo. Maxime iure quisquam atque perspiciatis minus, blanditiis vero.</p>
            </div>
            <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Convenience:</b>
              <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam architecto, veritatis molestias eveniet animi reiciendis consequuntur praesentium magnam officia iure fugit illo. Maxime iure quisquam atque perspiciatis minus, blanditiis vero.</p>
            </div>
            <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Exceptional Customer Service:</b>
              <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam architecto, veritatis molestias eveniet animi reiciendis consequuntur praesentium magnam officia iure fugit illo. Maxime iure quisquam atque perspiciatis minus, blanditiis vero.</p>
            </div>
          </div>
          <NewsletterBox/>
      </div>
    </div>
  )
}
