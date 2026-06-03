<!-- 全局页脚 -->
<template>
	<div class="ele-text-center" style="margin-bottom: 26px;margin-top: 12px;">
		<div class="ele-text-secondary mh-footer">
			<a target="_blank" class="ele-text-secondary" href="">
				{{ $t('layout.footer.website') }}
			</a>
			<em></em>
			<em></em>
			<a target="_blank" class="ele-text-secondary" href="">
				{{ $t('layout.footer.document') }}
			</a>
			<em></em>
			<em></em>
			<!-- <a
			  target="_blank"
			  class="ele-text-secondary"
			  href="https://eleadmin.com/goods/8"
			>
			  {{ $t('layout.footer.authorization') }}
			</a> -->
			<span>{{ $t('layout.footer.copyright') }}</span>
		</div>
	</div>
</template>

<script>
	export default {};
</script>
<style>
	.mh-footer{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>