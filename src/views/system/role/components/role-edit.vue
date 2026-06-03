<!-- 角色编辑弹窗 -->
<template>
  <ele-modal
    width="460px"
    :visible="visible"
    :close-on-click-modal="true"
    :title="isUpdate ? '修改角色' : '添加角色'"
    @update:visible="updateVisible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="92px">
      <el-form-item label="角色名称:" prop="roleName">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.roleName"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="角色编码:" prop="roleCode">
        <el-input
          clearable
          :maxlength="20"
		  :disabled="isUpdate"
          v-model="form.roleCode"
          placeholder="请输入角色编码"
        />
      </el-form-item>
	  <el-form-item v-if="isSuperAdmin" label="所属租户:" prop="tenantId">
	  	<el-select clearable :disabled="isUpdate" class="ele-fluid" v-model="form.tenantId" placeholder="请选择所属租户">
	  		<el-option v-for="(item,index) in ($store.state.user.tenantData||[])" :label="item.tenantName" :key="item._id" :disabled="item.deleted==1" :value="item._id" />
	  	</el-select>
	  </el-form-item>
      <el-form-item v-if="isSuperAdmin" label="是否管理员:" prop="isAdmin">
        <el-switch :active-value="1" :inactive-value="0" v-model="form.isAdmin"></el-switch>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          :rows="4"
          type="textarea"
          :maxlength="200"
          v-model="form.comments"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script>
  import { addRole, updateRole } from '@/api/system/role';
	import {
		getTenantData
	} from '@/api/layout';
  export default {
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 修改回显的数据
      data: Object
    },
	computed: {
		// 是否开启响应式布局
		styleResponsive() {
			return this.$store.state.theme.styleResponsive;
		},
		user(){
			return this.$store.state.user.info || {}
		},
		isSuperAdmin(){
			return this.user.tenantId === '0'
		},
	},
    data() {
      const defaultForm = {
        _id: null,
        roleName: '',
        roleCode: '',
		tenantId: '', //只有super超管可选择租户
		isAdmin: 0,
        comments: '',
      };
      return {
        defaultForm,
        // 表单数据
        form: { ...defaultForm },
        // 表单验证规则
        rules: {
          roleName: [
            {
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            }
          ],
          roleCode: [
            {
              required: true,
              message: '请输入角色编码',
              trigger: 'blur'
            }
          ],
        },
        // 提交状态
        loading: false,
        // 是否是修改
        isUpdate: false
      };
    },
    methods: {
      /* 保存编辑 */
      save() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
			if(this.isUpdate){
				delete this.form.tenantId;
			}else{
				delete this.form._id;
			}
          const saveOrUpdate = this.isUpdate ? updateRole : addRole;
          saveOrUpdate(this.form)
            .then((msg) => {
              this.loading = false;
              this.$message.success(msg);
              this.updateVisible(false);
              this.$emit('done');
            })
            .catch((e) => {
              this.loading = false;
            });
        });
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
      }
    },
    watch: {
      visible(visible) {
        if (visible) {
          if (this.data) {
            this.$util.assignObject(this.form, this.data);
            this.isUpdate = true;
          } else {
            this.isUpdate = false;
          }
		  
		  if(this.isSuperAdmin){
		  	this.rules.tenantId = [{
		  		required: true,
		  		message: '请选择所属租户',
		  		trigger: 'blur'
		  	}]
		  }else{
		  	delete this.rules.tenantId;
		  }
		  getTenantData().then(tenantData => {
		  	this.$store.commit('user/setTenantData', tenantData);
		  }).catch(() => {});
		  
        } else {
          this.$refs.form.clearValidate();
          this.form = { ...this.defaultForm };
        }
      }
    }
  };
</script>
