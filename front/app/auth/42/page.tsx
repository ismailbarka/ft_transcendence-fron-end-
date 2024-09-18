"use client"
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

const page = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');

    useEffect(() => {
      const fetchData = async () => {
        const code = searchParams.get('code');

        try {
          const res = await axios.post("http://localhost:8000/api/oauth/42/callback/", {
            code: code
          });
        }
        catch (err) {
          console.log(err.response.data);
          // router.push("/login");
        }
      };

      
  
      fetchData();
    }, []);

  return (
    <div>
      {code}
    </div>
  )
}

export default page
