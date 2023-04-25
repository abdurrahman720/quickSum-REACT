/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useState } from "react";
import { useLazyGetSummaryQuery } from "../Services/article";

const Demo = () => {
  const [copied, setCopied]  =useState(false)
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    
    // Load data from localStorage on mount
    useEffect(() => {
      const articlesFromLocalStorage = localStorage.getItem('articles');
      if (articlesFromLocalStorage) {
        try {
          const parsedArticles = JSON.parse(articlesFromLocalStorage);
          setAllArticles(parsedArticles);
        } catch (error) {
          console.error("Error parsing articles from localStorage:", error);
        }
      }
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { data } = await getSummary({ articleUrl: article.url });
      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        
        const updatedAllArticles = [newArticle, ...allArticles];
        console.log(updatedAllArticles)
        // update state and local storage
        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    };
  
  const handleCopy = (copyText) => {
    setCopied(copyText);
    navigator.clipboard.writeText(copyText)
    setTimeout(()=>setCopied(false), 3000)
  }

  return (
    <section className="mt-16 w-full max-w-xl ">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a url"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} className="link_card" onClick={() =>setArticle(item)}>
              <div className="copy_btn">
                <img src={copied === item.url ? tick : copy} onClick={()=>handleCopy(item.url)} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
            </div>
          ))}
       </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-centered">
        {isFetching ? (
          <img src={loader} className="w-20 h-20 object-contain" />
        ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, We can't process this website because it's too long...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
              article?.summary && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                    Article <span className="blue_gradient">Summary</span>
                  </h2>
                  <div className="summary_box flex ">
                    <p className="font-inter font-medium text-sm text-gray-700">
                      {article?.summary}   <div className="copy_btn">
                <img src={copied === article?.summary ? tick : copy} onClick={()=>handleCopy(article?.summary)} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
                    </p>
                   
                  </div>
                </div>
              )
        )}
      </div>
    </section>
  );
};

export default Demo;
