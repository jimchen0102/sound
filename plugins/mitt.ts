import mitt from 'mitt'
import { DocumentData } from 'firebase-admin/firestore'

type Events = {
  'add-song-document': DocumentData;
};

export default defineNuxtPlugin(() => {
  const emitter = mitt<Events>()

  return {
    provide: {
      on: emitter.on,
      off: emitter.off,
      emit: emitter.emit
    }
  }
})
