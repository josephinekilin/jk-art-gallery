<template>
    <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <component
                        :is="header.component"
                        :data="header.data"
                    ></component>
                </div>
                <div class="modal-body" style="padding: 0">
                    <component
                        :state="state"
                        :is="body.component"
                        :data="body.data"
                        @data-callback-body="handleBodyCallback"
                    ></component>
                </div>
                <div class="modal-footer" style="padding: 0">
                    <component
                        :state="state"
                        :is="footer.component"
                        :data="footer.data"
                        @data-callback-footer="handleFooterCallback"
                        @submit-action="handleSubmit"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            dataCallbackBody: "",
            dataCallbackFooter: 0,
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        header: {
            type: Object,
            required: true,
        },
        body: {
            type: Object,
            required: true,
        },
        footer: {
            type: Object,
            required: true,
        },
        state: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleBodyCallback(data) {
            this.dataCallbackBody = data;
        },
        handleFooterCallback(data) {
            this.dataCallbackFooter = data;
        },
        handleSubmit() {
            this.$emit("submit-action", {
                body: this.dataCallbackBody,
                footer: this.dataCallbackFooter,
            });
        },
    },
};
</script>

<style></style>
