import { useEffect } from "react";
import { useState } from "react"

const localCache = {};

export const useFetch = (url) => {

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
    error: null,
  });

  useEffect(() => {
    getFetch()
  
  }, [url])

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    })
  }

  const getFetch = async () => {

    if (localCache[url]) {
      console.log('Usando cache');
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      })
      return;
    }

    setLoadingState();
    const res = await fetch(url)

    // sleep
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!res.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: res.statusText,
      })
      return;
    }
    const data = await res.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    })

    console.log({data});
    localCache[url] = data;
  }
  

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }

}
