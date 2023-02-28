<template>
    <div class="row">
        <h3>{{ data.title }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style></style>
