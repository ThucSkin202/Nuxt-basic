<template>
    <div class="mb-7">
        <div class="text-gray-500 text-base font-medium">
            <NuxtLink to="/admin/roles">
                <Icon class="text-xl" name="material-symbols-light:keyboard-backspace-rounded" /> Back to Roles
            </NuxtLink>
        </div>
        <h1 class="font-bold text-3xl py-3">{{ roleDetails.name }}</h1>
        <div class="text-gray-700">Role ID: <lable class="rounded-md bg-gray-200 p-1.5 text-xs">{{ roleDetails._id }}
            </lable>
        </div>
    </div>
    <div class="">{{ errMsg }}</div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

const authStore = useAuthStore();
const { id } = useRoute().params;

const roleDetails = ref([]);
const errMsg = ref();

const fetchRoleDetail = async (roleId) => {
    try {
        await authStore.getRoleById(roleId);

        if (authStore.roleDetails) {
            roleDetails.value = authStore.roleDetails;
        } else {
            errMsg.value = "Authorization";
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu vai trò:', error);
    }
}
fetchRoleDetail(id);

</script>
