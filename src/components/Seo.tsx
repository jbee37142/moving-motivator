import Head from 'next/head'

type SeoProps = {
  title?: string
  description?: string
  imagePath?: string
}

const DEFAULT_TITLE = '무빙 모티베이터 | 나의 동기 스위치 찾기'
const DEFAULT_DESCRIPTION =
  '간단한 선택으로 동기부여/동기저해 패턴을 분석해 당신의 동기 스위치 Top 3를 리포트로 보여드립니다.'
const DEFAULT_IMAGE_PATH = '/main.png'

export default function Seo({
  title,
  description,
  imagePath = DEFAULT_IMAGE_PATH,
}: SeoProps) {
  const resolvedTitle = title ? `${title} | 무빙 모티베이터` : DEFAULT_TITLE
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta key="description" name="description" content={resolvedDescription} />
      <meta key="robots" name="robots" content="index, follow" />
      <meta key="theme-color" name="theme-color" content="#0f172a" />
      <link key="icon" rel="icon" href="/favicon.ico" />

      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:locale" property="og:locale" content="ko_KR" />
      <meta key="og:site_name" property="og:site_name" content="무빙 모티베이터" />
      <meta key="og:title" property="og:title" content={resolvedTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={resolvedDescription}
      />
      <meta key="og:image" property="og:image" content={imagePath} />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={resolvedTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={resolvedDescription}
      />
      <meta key="twitter:image" name="twitter:image" content={imagePath} />
    </Head>
  )
}

