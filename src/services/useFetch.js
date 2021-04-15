import {useRef,useState,useEffect} from 'react';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch=(url)=>{
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(null); 
    const [loading, setLoading] = useState(true);

    const isMounted=useRef(false);//think of this like an instance variable ,React will keep track of this ref values between renders
    //So we can use this value to track whether the component is mounted

    useEffect(() => {
      isMounted.current=true;
        async function init() {
          try {
            const response = await fetch(baseUrl+url);
            if(response.ok){
                const json= await response.json();
                //our goal is to only set state if the component is mounted
                if(isMounted.current) setdata(json); 
            }else{
                throw response;
            }
            
          } catch (e) {
            //our goal is to only set state if the component is mounted
            if(isMounted.current) seterror(e);
          } finally {
            //our goal is to only set state if the component is mounted
            if(isMounted.current) setLoading(false);
          }
        }
    
        init();

        //any function returned from useEffect is called on unmount
        return ()=>{
          isMounted.current=false;
        }
      }, [url]);

      return {data,error,loading};

}

export default useFetch;