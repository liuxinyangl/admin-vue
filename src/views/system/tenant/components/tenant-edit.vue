<!-- 字典编辑弹窗 -->
<template>
  <ele-modal
    width="500px"
    :visible="visible"
    :close-on-click-modal="true"
    :title="isUpdate ? '修改租户' : '添加租户'"
    @update:visible="updateVisible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="租户 ID:" :disabled="isUpdate" prop="_id">
		<el-input
		  v-model="form._id"
		  placeholder="请输入租户ID"
		  :disabled="isUpdate"
		  class="ele-fluid ele-text-left"
		/>
      </el-form-item>
	  <el-form-item label="租户名称:" prop="tenantName">
	    <el-input
	      clearable
	      :maxlength="20"
	      v-model="form.tenantName"
	      placeholder="请输入租户名称"
	    />
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
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script>
	import {
		addTenant,
		updateTenant
	} from '@/api/system/tenant';

  export default {
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 修改回显的数据
      data: Object
    },
    data() {
      const defaultForm = {
        _id: "",
        tenantName: '',
        comments: '',
      };
      return {
        defaultForm,
        // 表单数据
        form: { ...defaultForm },
        // 表单验证规则
        rules: {
          _id: [
            {
              required: true,
              message: '请输入租户ID',
              trigger: 'blur'
            }
          ],
          tenantName: [
            {
              required: true,
              message: '请输入租户名称',
              trigger: 'blur'
            }
          ]
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
          const saveOrUpdate = this.isUpdate ? updateTenant : addTenant;
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
        } else {
          this.$refs.form.clearValidate();
          this.form = { ...this.defaultForm };
        }
      }
    }
  };
</script>
