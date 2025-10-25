import {httpRouter} from 'convex/server'
import {httpAction} from './_generated/server'

const http = httpRouter()

http.route({
  path: '/upload-file',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    try {
      const {storage} = ctx

      // Get an upload URL from Convex. The frontend will then POST the file
      // to this URL.
      const uploadUrl = await storage.generateUploadUrl()

      return new Response(JSON.stringify({uploadUrl}), {
        status: 200,
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
    } catch (error) {
      return new Response((error as Error).message, {
        status: 500,
      })
    }
  }),
})

export default http
