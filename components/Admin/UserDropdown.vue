<template>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
                <MenuItem v-slot="{ active }">
                <NuxtLink :href="`/admin/users/${cleanUsername}`"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View
                    Details</NuxtLink>
                </MenuItem>
            </div>
            <div class="py-1">
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'px-4 py-2 text-sm flex items-center gap-3',]">
                    <Icon name="icon-park-twotone:people-bottom" />
                    <p>Assign
                        Roles</p>
                </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex items-center gap-3 px-4 py-2 text-sm']">
                    <Icon name="ic:twotone-check-box" />Assign Permissions
                </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex items-center gap-3 px-4 py-2 text-sm']">
                    <Icon name="streamline:mail-send-envelope" />
                    Send Verification Mail
                </a>
                </MenuItem>
            </div>
            <div class="py-1">
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Change
                    Email</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Change
                    Password</a>
                </MenuItem>
            </div>
            <div class="py-1">
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex items-center gap-3 px-4 py-2 text-sm']">
                    <Icon name="ic:twotone-block" />Block
                </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'text-red-700 flex items-center gap-3 px-4 py-2 text-sm']">
                    <Icon name="solar:trash-bin-2-linear" />Delete
                </a>
                </MenuItem>
            </div>
        </MenuItems>
    </transition>
</template>

<script>
import { MenuItems, MenuItem } from '@headlessui/vue'

export default {
    components: {
        MenuItems,
        MenuItem
    },
    props: {
        username: {
            type: String,
            required: true
        }
    },
    computed: {
        cleanUsername() {
            // Kiểm tra xem username có chứa '@gmail.com' không và loại bỏ nếu có
            return this.username.includes('@gmail.com', '@email.com') ? this.username.replace('@gmail.com', '') : this.username;
        }
    }
}

</script>
