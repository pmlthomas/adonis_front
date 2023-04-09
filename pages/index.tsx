import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import HomepageFilterButtons from '@/components/HomepageFilterButtons';
import HomepageSqueletons from '@/components/HomepageSqueletons';
import { useEffect, useState } from 'react';
import getContentByCategory from '@/Axios/getContentByCategory';
import GetPopularContentAxios from '@/Axios/GetPopularContentAxios';
import GetNewContentAxios from '@/Axios/GetNewContentAxios';
import useAuth from '@/context/AuthContext';
import FilterContentResponse from '@/Axios/FilterContentResponse';
import { userType } from '@/Types/UserType';
import { languageStrings } from '@/utils/languageStrings';

export default function Home() {
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [contentChosen, setContentChosen] = useState<any>(null);
  const [popularContent, setPopularContent] = useState<any>(null);
  const [newContent, setNewContent] = useState<any>(null);
  const [books, setBooks] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [quotes, setQuotes] = useState<any>(null);
  const { getUser }: any = useAuth();
  const user: userType = getUser();

  // Displaying Popular Content by Default
  useEffect(() => {
    if (!contentChosen && user.id) {
      changeContentType('popularContent');
    }
  }, []);

  const getPopularContent = async () => {
    if (popularContent) {
      setContentDisplayed(popularContent);
    } else {
      const popularContent = FilterContentResponse(
        await GetPopularContentAxios(user.id)
      );
      setContentDisplayed(popularContent);
      setPopularContent(popularContent);
    }
  };

  const getNewContent = async () => {
    if (newContent) {
      setContentDisplayed(newContent);
    } else {
      const newContent = FilterContentResponse(
        await GetNewContentAxios(user.id)
      );
      setContentDisplayed(newContent);
      setNewContent(newContent);
    }
  };

  const getBooks = async () => {
    if (books) {
      setContentDisplayed(books);
    } else {
      const booksMapping = FilterContentResponse(
        await getContentByCategory('book', user.id)
      );
      setContentDisplayed(booksMapping);
      setBooks(booksMapping);
    }
  };

  const getQuotes = async () => {
    if (quotes) {
      setContentDisplayed(quotes);
    } else {
      const quotesMapping = FilterContentResponse(
        await getContentByCategory('quote', user.id)
      );
      setContentDisplayed(quotesMapping);
      setQuotes(quotesMapping);
    }
  };

  const getVideos = async () => {
    if (videos) {
      setContentDisplayed(videos);
    } else {
      const videosMapping = FilterContentResponse(
        await getContentByCategory('video', user.id)
      );
      setContentDisplayed(videosMapping);
      setVideos(videosMapping);
    }
  };

  // The User Choose what Content to Display
  function changeContentType(contentTypeChosen: string) {
    setContentChosen(contentTypeChosen);
    switch (contentTypeChosen) {
      case 'popularContent':
        return getPopularContent();
      case 'newContent':
        return getNewContent();
      case 'book':
        return getBooks();
      case 'quote':
        return getQuotes();
      case 'video':
        return getVideos();
    }
  }

  return (
    <>
      <Head>
        <title>{languageStrings.homepage}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultLayout>
          <div className="flex justify-center m-10 p-10">
            <div className="flex-col">
              <HomepageFilterButtons changeContentType={changeContentType} />
              <div className="-mt-7 flex justify-center">
                <div className="flex-col">
                  {contentDisplayed ? contentDisplayed : <HomepageSqueletons />}
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </main>
    </>
  );
}
