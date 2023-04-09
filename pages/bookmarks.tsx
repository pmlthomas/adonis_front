import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useState, useEffect } from 'react';
import GetBookmarkedContentAxios from '@/Axios/GetBookmarkedContentAxios';
import useAuth from '@/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BOOKMARKS } from '@/Redux/Reducers/BookmarksSlice';
import FilterContentResponse from '@/Axios/FilterContentResponse';
import { bookmarkReduxType } from '@/Types/bookmarkReduxType';

export default function Bookmarks() {
  const [bookmarkContent, setBookmarkContent] = useState<any>(null);
  const [bookmarkDisplay, setBookmarkDisplay] = useState<any>(null);
  const { getUser }: any = useAuth();
  const user = getUser();
  const dispatch = useDispatch();
  const bookmarkRedux = useSelector(
    (state: bookmarkReduxType) => state.bookmarks.bookmarks
  );

  const noBookmarks = (
    <p className="mt-8">Vous n'avez aucun favoris pour le moment.</p>
  );

  // Getting All Bookmarks from Database or Redux
  useEffect(() => {
    if (user.id) {
      const fetchBookmarkContent = async () => {
        if (bookmarkRedux) {
          setBookmarkContent(FilterContentResponse(bookmarkRedux));
        } else {
          const bookmarks = await GetBookmarkedContentAxios(user.id);
          const mappedBookmarks = FilterContentResponse(bookmarks);
          setBookmarkContent(mappedBookmarks);
          dispatch(ADD_BOOKMARKS(bookmarks));
        }
      };
      fetchBookmarkContent();
    }
  }, []);

  // Handling Bookmarks Loading, Display and NoContent
  useEffect(() => {
    if (bookmarkContent) {
      if (bookmarkContent.length > 0) {
        setBookmarkDisplay(bookmarkContent);
      } else {
        setBookmarkDisplay(noBookmarks);
      }
    } else {
      setBookmarkDisplay('Chargement...');
    }
  }, [bookmarkContent]);

  return (
    <>
      <Head>
        <title>Bookmarks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultLayout>
          <div className="flex justify-center m-10 p-10 ">
            <div className="flex-col">
              {bookmarkContent && bookmarkContent.length > 0 && (
                <h1 className="mb-8 mt-10 text-[1.1em]">Mes favoris</h1>
              )}
              {bookmarkDisplay}
            </div>
          </div>
        </DefaultLayout>
      </main>
    </>
  );
}
