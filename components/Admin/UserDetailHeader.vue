<template>
    <div class="p-7">
        <div class="text-gray-500 text-base font-medium">
            <NuxtLink to="/admin/users">
                <Icon class="text-xl" name="material-symbols-light:keyboard-backspace-rounded" /> Back to Users
            </NuxtLink>
        </div>
        <div class="flex items-center justify-between">
            <div class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                    <div class="h-14 w-14 sm:ml-5 rounded-full overflow-hidden">
                        <img class="h-full w-full object-cover"
                            src="https://cdnphoto.dantri.com.vn/Im0W2Oa59BulrmFjQo1dOsDcBZY=/thumb_w/990/2021/10/30/trang-nhungdocx-1635528230350.jpeg"
                            alt="Description of the image" />
                    </div>
                    <div class="ml-4">
                        <div class="font-semibold text-2xl">{{ user_detail_api.username }}
                        </div>
                        <div class="font-medium text-gray-900 mt-2">user_id: <label
                                class="rounded-md bg-gray-200 p-1.5 text-xs">{{ user_detail_api._id }}</label></div>
                    </div>
                </div>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Actions</button>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

const { id } = useRoute().params

const user_detail_api = ref([])

onMounted(async () => {
    try {
        const response = await fetch(`https://laco-auth.10z.one/users/${id}`)
        if (!response.ok) {
            throw new Error('User not found')
        }
        const data = await response.json()
        user_detail_api.value = data.data
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error)
        router.replace({ name: 'error', props: { error: { statusCode: 404, message: 'User not found' } } })
    }
})

</script>