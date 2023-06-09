import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';
import UpdateBookmarkAxios from '@/Axios/UpdateBookmarkAxios';
import BookmarkHeart from './BookmarkHeart';
import { userType } from '@/Types/UserType';
import { bookType } from '@/Types/BookType';
import useLang from '@/hooks/useLang';
import Image from 'next/image';
import useContent from '@/context/ContentContext';
import { useRouter } from 'next/router';
import { BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './DeleteModal';

export default function BookCard({ data }: bookType) {
  const {
    id,
    title,
    subtitle,
    author,
    book_cover,
    ranking,
    isBookmarked,
    userRating,
  } = data;
  const [currentRanking, setCurrentRanking] = useState<any>(null);
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] =
    useState<boolean>(isBookmarked);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const langStrings = useLang();
  const { updateBookmark, updateRanking } = useContent();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Updating client and server side values for the ranking
  const handleArrowClick = async (
    clientSideNewValue: any,
    serverSideNewValue: number
  ) => {
    if (!isUpdating && user.id) {
      setIsUpdating(true);
      clientSideNewValue != 0
        ? setCurrentRanking(clientSideNewValue)
        : setCurrentRanking('zero');
      updateRanking(id, ranking + clientSideNewValue);
      setIsUpdating(await UpdateRankingAxios(id, user.id, serverSideNewValue));
    }
  };

  // Add or Remove a Post from Bookmarks
  const handleBookmarkClick = async () => {
    updateBookmark(id);
    setIsCurrentlyBookmarked(!isCurrentlyBookmarked);
    UpdateBookmarkAxios(id, user.id);
  };

  return (
    <div
      className={`${
        router.pathname === '/profile' ? 'w-full' : 'max-w-[800px] w-[95vw]'
      } min-h-[200px] min-w-[364px] bg-white flex mb-8 rounded-md border-gray-400 dark:border-gray-700 border-[1px]`}
    >
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-[15px] rounded-l-md">
        <div className="flex flex-col justify-between items-center">
          {currentRanking
            ? currentRanking === 'zero'
              ? 0
              : currentRanking
            : ranking === 0
            ? 0
            : ranking}
          {router.pathname === '/profile' && (
            <BsFillTrash3Fill
              onClick={() => setIsDeleteModalOpen(true)}
              size={25}
              className="mt-[54px] cursor-pointer"
            />
          )}
          <BookmarkHeart
            isCurrentlyBookmarked={isCurrentlyBookmarked}
            handleBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          userId={user.id}
          postId={id}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] ml-[15px] relative min-h-[175px] w-[120px]">
          {book_cover && (
            <Image
              layout={'fill'}
              loader={() => book_cover}
              src={book_cover}
              alt="bookCover"
            />
          )}
        </div>
        <div className="flex-col md:-mt-[175px] md:ml-[150px] ml-[15px] mt-[5px] pb-3">
          <h1 className="underline underline-offset-4">
            {title}: {subtitle}
          </h1>
          <p className="mt-1 text-gray-500 text-[0.8em]">{author}</p>
          <div className="flex md:w-full md:h-full md:justify-end md:items-end md:mt-[30px] md:pr-[20px] mt-1">
            <div className="flex">
              <p className="text-gray-500 text-[0.8em]">
                {langStrings && langStrings.year}:
              </p>
              <p className="text-[0.8em] ml-[5px]">2020</p>
            </div>
            <div className="flex ml-2">
              <p className="text-gray-500 text-[0.8em]">
                {langStrings && langStrings.language}:
              </p>
              <p className="text-[0.8em] ml-[5px]">FR</p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-0">
        <Ranking
          handleArrowClick={handleArrowClick}
          originalValue={ranking}
          isUpdating={isUpdating}
          userRating={userRating}
        />
      </div>
    </div>
  );
}
