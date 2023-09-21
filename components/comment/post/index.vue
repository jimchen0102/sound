<template>
  <div class="mt-15 flex items-center justify-between gap-x-7.5 lg:mt-10 lg:justify-start">
    <span class="text-white">
      5 則留言
    </span>
    <div class="relative text-white">
      <select class="block h-10 w-[180px] appearance-none bg-transparent outline-none">
        <option
          value="descending"
          class="text-black"
        >
          排序依據 (由新到舊)
        </option>
        <option
          value="ascending"
          class="text-black"
        >
          排序依據 (由舊到新)
        </option>
      </select>
      <div class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
        <Icon name="Adjust" />
      </div>
    </div>
  </div>

  <div class="relative mt-5">
    <CommentPostForm />
  </div>

  <div class="relative mt-7.5">
    <ul class="space-y-7.5">
      <li>
        <CommentPostPreview />
      </li>
    </ul>
  </div>
</template>
