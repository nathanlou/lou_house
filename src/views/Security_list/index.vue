<template>
	<div class="security_container">
			<div class="security" v-for="(item,index) in security_list" :key="index">
				<div>{{index+1}}号仓</div>
				<div class="msg">
					<div>物料余量</div>
					<div>{{item.number}}吨</div>
					<div>上空值</div>
					<div>{{item.space}}米</div>
				</div>
			</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				security_list: [{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					},
					{
						number: "400",
						space: '20'
					}
				]
			}
		}
	}
</script>

<style scoped="scoped">
	.security_container {
		width: 96%;
		margin-left: 2%;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
	}

	.security {
		width: 18.75rem;
		height: 16.875rem;
		background-image: url(../../assets/404_images/tc.png);
		background-size: 100% 100%;
		margin-top: 2%;
	}

	.msg {
		margin-top: 2rem;
	}

	.status {
		margin-top: 1.5%;
	}
</style>
