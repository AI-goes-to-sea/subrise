import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {

    const t = useTranslations('Pages.privacy_policy');
    return (
      <div className="p-6 prose mx-auto text-zinc-500 div-markdown-color *:dark:text-white">
        <main className="mx-auto h-full my-8">
          <div className="p-6 prose mx-auto text-zinc-500 div-markdown-color *:dark:text-white">
            <h1>{t('title')}</h1>
            <p>{t('effective_date')}</p>
            <h2>{t('overview')}</h2>
            <p>{t('overview_description')}</p>
            <h2>{t('information_collection')}</h2>
            <h3>{t('personal_data')}</h3>
            <p>{t('personal_data_description')}</p>
            <ul>
            <li>{t('personal_data_description_1')}</li>
            <li>{t('personal_data_description_2')}</li>
            <li>{t('personal_data_description_3')}</li>
            </ul>
            <p>{t('personal_data_description_4')}</p>
            <h3>{t('non_personal_data')}</h3>
            <p>{t('non_personal_data_description')}</p>
            <h2>{t('data_collection_purpose')}</h2>
            <p>{t('data_collection_purpose_description')}</p>
            <h2>{t('data_sharing')}</h2>
            <p>{t('data_sharing_description')}</p>
            <h2>{t('children_privacy')}</h2>
            <p>{t('children_privacy_description')}</p>
            <h2>{t('privacy_policy_update')}</h2>
            <p>{t('privacy_policy_update_description')}</p>
            <h2>{t('contact_us')}</h2>
            <p>{t('contact_us_description')}</p>
          </div>
        </main>
      </div>
    )
}