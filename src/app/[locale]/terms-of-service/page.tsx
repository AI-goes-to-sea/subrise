import { useTranslations } from "next-intl";

export default function TermsOfService() {
    const t = useTranslations('Pages.terms_of_service');

    return (
      <div className="p-6 prose mx-auto text-zinc-500 div-markdown-color *:dark:text-white">
        <h1>{t('title')}</h1>
        <p>{t('effective_date')}</p>
        <h2>{t('overview')}</h2>
        <p>{t('overview_description')}</p>
        <h2>{t('acceptance_of_terms')}</h2>
        <ul>
          <li>{t('acceptance_of_terms_description')}
            <ul>
              <li>{t('acceptance_of_terms_description_1')}</li>
            </ul>
            <ul>
              <li>{t('acceptance_of_terms_description_2')}</li>
              <li>{t('acceptance_of_terms_description_3')}</li>
              <li>{t('acceptance_of_terms_description_4')}</li>
              <li>{t('acceptance_of_terms_description_5')}</li>
            </ul>
          </li>
          <li>{t('acceptance_of_terms_description_6')}</li>
        </ul>
        <h2>{t('disclaimer')}</h2>
        <p>{t('disclaimer_description')}</p>
        <h2>{t('limitations')}</h2>
        <p>{t('limitations_description')}</p>
        <h2>{t('material_accuracy')}</h2>
        <p>{t('material_accuracy_description')}</p>
        <h2>{t('links')}</h2>
        <p>{t('links_description')}</p>
        <h2>{t('modifications')}</h2>
        <p>{t('modifications_description')}</p>
        <h2>{t('governing_law')}</h2>
        <p>{t('governing_law_description')}</p>
        <h2>{t('contact_us')}</h2>
        <p>{t('contact_us_description')}</p>
      </div>
    )
}