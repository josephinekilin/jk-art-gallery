<template>
    <div id="prod-modal-body">
        <img class="img-fluid w-100" :src="data.img" alt="" />
        <div class="px-2">
            <p>{{ data.desc }}</p>
            <small style="float: left">Stok Tersedia: {{ data.stock }}</small>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
        state: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style>
#prod-modal-body img {
    max-height: 250px;
    object-fit: cover;
    object-position: center;
}
</style>
