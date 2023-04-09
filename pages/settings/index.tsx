import Head from 'next/head';
import { useState, useEffect } from 'react';
import { languageStrings } from '@/utils/languageStrings';
import ProfileContent from '@/components/Settings/ProfileContent';
import SettingsLayout from '@/layouts/SettingsLayout';

export default function Parameters() {
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

  return (
    <>
      <Head>
        <title>{langStrings && langStrings.settings}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SettingsLayout>
          <div className="flex">
            <ProfileContent />
          </div>
        </SettingsLayout>
      </main>
    </>
  );
}
