import * as React from "react";
import { Roboto } from "next/font/google";
import { cookies, headers } from "next/headers"
import Script from "next/script";
import Image from "next/image";
import Negotiator from "negotiator";
import { dictionaries } from "@/dictionaries"
import { I18nProvider } from "@/app/_providers/I18nProvider"
import MuiProvider from "@/app/_providers/MuiProvider";
import "@/app/_components/swiper.css";

const i18n = {
    defaultLocale: "ru",
    locales: Object.keys(dictionaries),
};

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

export const metadata = {
    title: "Horizon – Временные ряды и прогнозы",
    description: "Инструмент для анализа и прогнозирования временных рядов. Time series forecasting and analysis tool.",
    keywords: [
        // Английские ключевые слова
        "time series analysis",
        "time series forecasting",
        "forecasting time series",
        "seasonal decomposition of time series",
        "trend analysis in time series",
        "seasonality detection in time series",
        "temporal patterns detection",
        "LSTM for time series",
        "ARIMA time series models",
        "SARIMA models",
        "Prophet time series",
        "predictive models for time series",
        "demand forecasting models",
        "time series visualization",
        "multivariate time series analysis",
        "univariate time series models",
        "time series clustering",
        "feature engineering for time series",
        "stationarity testing",
        "time series components analysis",
        "predictive analytics",
        "demand forecasting",
        "business forecasting",
        "sales forecasting",
        "inventory forecasting",
        "financial time series forecasting",
        "capacity planning",
        "revenue forecasting",
        "forecasting in supply chain",

        // Русские ключевые слова
        "анализ временных рядов",
        "прогнозирование временных рядов",
        "модели временных рядов",
        "сезонная декомпозиция временных рядов",
        "трендовый анализ временных рядов",
        "выявление сезонности во временных рядах",
        "выявление закономерностей во временных рядах",
        "LSTM для временных рядов",
        "модели ARIMA",
        "SARIMA модели",
        "Prophet для временных рядов",
        "предиктивные модели временных рядов",
        "прогнозирование спроса по временным рядам",
        "визуализация временных рядов",
        "многомерные временные ряды",
        "одномерные временные ряды",
        "кластеризация временных рядов",
        "инженерия признаков для временных рядов",
        "тестирование стационарности",
        "анализ компонент временных рядов",
        "предиктивная аналитика",
        "прогнозирование спроса",
        "бизнес-прогнозирование",
        "прогнозирование продаж",
        "прогнозирование запасов",
        "финансовое прогнозирование",
        "планирование мощностей",
        "прогнозирование выручки",
        "прогнозирование в цепочке поставок"
    ],
    authors: [{ name: "Horizon Team", url: "https://horizontsd.ru" }],
    openGraph: {
        title: "Horizon — Прогнозирование временных рядов",
        description: "Аналитика и прогноз временных рядов с помощью машинного обучения. Time series forecasting made easy.",
        url: "https://horizontsd.ru ",
        siteName: "Horizon",
        locale: "ru_RU",
        type: "website",
    },
    robots: "index, follow",
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

async function getPreferredLanguages(): Promise<string[]> {
    const headersList = await headers();
    if (!headersList.has("accept-language")) {
        return [i18n.defaultLocale];
    }
    const acceptLanguage = headersList.get("accept-language");
    if (!acceptLanguage) {
        return [i18n.defaultLocale];
    }
    const negotiator = new Negotiator({ headers: { "accept-language": acceptLanguage } });
    return negotiator.languages();
}

async function getPreferredLanguage(): Promise<string> {
    let lang = i18n.defaultLocale;
    const headersList = await headers();
    if (!headersList.has("accept-language")) {
        return i18n.defaultLocale;
    }
    const acceptLanguage = headersList.get("accept-language");
    if (!acceptLanguage) {
        return i18n.defaultLocale;
    }
    const preferredLanguages = await getPreferredLanguages();
    const shouldAssertLocale = i18n.locales.some(locale => preferredLanguages.includes(locale));
    if (shouldAssertLocale) {
        const negotiator = new Negotiator({ headers: { "accept-language": acceptLanguage } });
        const negotiatedLang = negotiator.language(i18n.locales);
        if (negotiatedLang) {
            lang = negotiatedLang;
        }
    }
    return lang;
}

const Metrika = () => (
    <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
                            (function(m,e,t,r,i,k,a){
                                m[i]=m[i]||function(){
                                    (m[i].a=m[i].a||[]).push(arguments)
                                };
                                m[i].l=1*new Date();
                                for (var j = 0; j < document.scripts.length; j++) {
                                    if (document.scripts[j].src === r) { return; }
                                }
                                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                            ym(101065655, "init", {
                                clickmap:true,
                                trackLinks:true,
                                accurateTrackBounce:true,
                                webvisor:true
                            });
                        `
        }}
    />
)

const MetrikaNoScript = () => (
    <noscript>
        <div>
            <Image
                src="https://mc.yandex.ru/watch/101065655"
                width={1}
                height={1}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
            />
        </div>
    </noscript>
);

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    let preferredLanguage = await getPreferredLanguage();
    const cookieLanguage = cookieStore.get("language")?.value;

    if (cookieLanguage) {
        preferredLanguage = cookieLanguage;
    }

    return (
        <html lang={preferredLanguage} className={roboto.variable} suppressHydrationWarning>
            <head>
                {process.env.NODE_ENV === "production" && <Metrika />}
            </head>
            <body>
                <I18nProvider lang={preferredLanguage}>
                    <MuiProvider>
                        {children}
                    </MuiProvider>
                </I18nProvider>
            </body>
            {process.env.NODE_ENV === "production" && <MetrikaNoScript />}
        </html>
    );
}