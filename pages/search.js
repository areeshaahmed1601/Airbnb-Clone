import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router';
import {format} from "date-fns";
import InfoCard from '../components/InfoCard';

function Search({searchResults}) {
 const router=useRouter();

 //Es6 destructure
 const {location,startDate,endDate,numberOfGuests}=router.query;

 const formattedStartDate=format(new Date(startDate),"dd MMM yy")
 const formattedEndDate=format(new Date(endDate),"dd MMM yy")
 const range=`${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
       <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`}/>
         <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='text-xs'>300+ stays -{range}- for{numberOfGuests} guests</p>

                <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                <div className='hidden lg:inline-flex mt-2 mb-6 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95% active:bg-gray-100 transition transform duration-100 ease-out'>Cancelation Flexibility</p>

                    <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95% active:bg-gray-100 transition transform duration-100 ease-out'>Type of place</p>

                    <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95% active:bg-gray-100 transition transform duration-100 ease-out'>Price</p>

                    <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95% active:bg-gray-100 transition transform duration-100 ease-out'>Rooms And Beds</p>

                    <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95% active:bg-gray-100 transition transform duration-100 ease-out'>More filters</p>
                </div>
                
                <div className='flex flex-col'>
                {searchResults?.map(({img,location,title,description,star,price,total})=>(
              <InfoCard
              key={img}
              img={img}
              location={location}
              description={description}
              star={star}
              price={price}
              total={total}
              title={title}
              />
          ))}
                </div>
               
            </section>
         </main>
       <Footer/>
    </div>
  )

}


export default Search

export async function getServerSideProps(){
  const searchResults=await fetch("https://www.jsonkeeper.com/b/5NPS").then(res =>res.json());
  return{
    props:{
      searchResults,
    }
  }
}