import {useState,useEffect} from 'react';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch=(url)=>{
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
          try {
            const response = await fetch(baseUrl+url);
            if(response.ok){
                const json= await response.json();
                setdata(json);
            }else{
                throw response;
            }
            
          } catch (e) {
            seterror(e);
          } finally {
            setLoading(false);
          }
        }
    
        init();
      }, [url]);

      return {data,error,loading};

}

export default useFetch;