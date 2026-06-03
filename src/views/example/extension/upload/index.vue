<template>
  <div class="ele-body">
    <demo-basic-unicloud />
    <demo-basic-oss />
    <demo-basic />
    <demo-advanced />
    <demo-multiple />
  </div>
</template>

<script>
  import DemoBasicUnicloud from './components/demo-basic-unicloud.vue';
  import DemoBasicOss from './components/demo-basic-oss.vue';
  import DemoBasic from './components/demo-basic.vue';
  import DemoAdvanced from './components/demo-advanced.vue';
  import DemoMultiple from './components/demo-multiple.vue';

  export default {
    name: 'ExtensionUpload',
    components: { DemoBasicUnicloud, DemoBasicOss, DemoBasic, DemoAdvanced, DemoMultiple }
  };
</script>
