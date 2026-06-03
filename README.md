# 基于Vue2与UniCloud的云端一体 Admin 管理系统脚手架（前端）

> 公开仓库不再提供线上演示地址和演示账号。请根据 `.env.example` 配置自己的 uniCloud 服务后本地运行。

#### 系统简介
- 专为SaaS系统而生，超级管理员（技术提供方）为购买方（B/C端用户）建立租户并分配购买的功能后，建立购买方（管理员）账号，购买方使用该管理员账户，建立自己公司的用户系统（普通用户），开展业务。
- 系统管理已完成，均通过云函数URL化对接接口，满足未来各种前端与后端分离的需求。

#### 注意
- 数据表的索引均未设置，请自行设置。
- mh-captcha.schema         生成验证码表
- mh-dictionary.schema      字典表
- mh-file-record.schema     文件上传记录表
- mh-login-log.schema       登录日志表
- mh-login-session.schema   登录信息维护表
- mh-menu.schema            菜单表
- mh-organization.schema    组织机构表
- mh-role.schema            角色表
- mh-tenant.schema          租户表
- mh-user.schema            用户表

#### 超级管理员（技术提供方） - 流程
- 1 登录超管账户。
- 2 租户管理，新建租户后，勾选购买的功能。
- 3 角色管理，新建角色，选择所属租户，勾选管理员权限。
- 4 用户管理，新建用户，选择所属租户，选择刚刚创建的管理员角色。
- 5 完成公司管理员的创建。

#### 公司管理员（B/C端用户） - 流程
- 1 登录刚刚创建的公司管理员账号。
- 2 开展传统的管理员业务。

#### 技术
- 前端框架：vue2、elementui
- 后端框架：unicloud、jql、uni-cloud-router

#### 开源维护
- 已移除公开演示地址、演示账号和真实服务配置。
- 本地运行前请复制 `.env.example` 并配置自己的 uniCloud、高德地图和 OSS 参数。
- 登录后左侧菜单包含“开源维护 / 开源看板”，用于跟踪公开仓库清理、配置状态和维护任务。

