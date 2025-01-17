import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Howto } from 'src/pages/Library/Content/Page/Library'
import { howtoService } from 'src/pages/Library/library.service'
import { NotFoundPage } from 'src/pages/NotFound/NotFound'
import { pageViewService } from 'src/services/pageViewService.server'
import { generateTags, mergeMeta } from 'src/utils/seo.utils'

import type { LoaderFunctionArgs } from '@remix-run/node'
import type { ILibrary } from 'oa-shared'

export async function loader({ params }: LoaderFunctionArgs) {
  const howto = await howtoService.getBySlug(params.slug as string)

  if (howto?._id) {
    // not awaited to not block the render
    pageViewService.incrementViewCount('howtos', howto._id)
  }

  return json({ howto })
}

export function HydrateFallback() {
  // This is required because all routes are loaded client-side. Avoids a page flicker before css is loaded.
  // Can be removed once ALL pages are using SSR.
  return <div></div>
}

export const meta = mergeMeta<typeof loader>(({ data }) => {
  const howto = data?.howto as ILibrary.DB

  if (!howto) {
    return []
  }

  const title = `${howto.title} - Library - ${import.meta.env.VITE_SITE_NAME}`

  return generateTags(title, howto.description, howto.cover_image?.downloadUrl)
})

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const howto = data.howto as ILibrary.DB // there is some inference issue, shouldn't need 'as'

  if (!howto) {
    return <NotFoundPage />
  }

  return <Howto howto={howto} />
}
