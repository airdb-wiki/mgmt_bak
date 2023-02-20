# SRE 管理规范

## 主域名(二级域名) 使用

- 境外开发：airdb.dev
- 线上测试： airdb.live
- 应用管理： airdb.space
- 国内业务主域名：airdb.net
- 主机管理： airdb.host

命名规范：<project>.<domain>

其中 project 是一串英文字符，不能包括 "."， 最好是项目英文名，可以使用"-"和数字。

## 域名指向

默认 "@" 主域名使用 cdn， "*" 通配域名指向 vip, 路由给 waf gateway, 最终转发给后端服务。
如有需要，其他可以申请其他域名指向

禁止使用 四级域名。

## 网关

当前网络接入是使用 4 层负载均衡（load balancer), 转发给 Caddy Waf.
Caddy Waf 功能
- 侦测请求，如果判定为异常请求，则进行阻断。
- 转发后端，正常返回给用户。
- HTTPS 证书自动申请、更新

## 应用管理

所有开发项目，均有 Readme.md + Makefile 文件，通常可通过 make 启动服务，或是使用 systemd 管理服务。

## 监控方案

Prometheus + Garafana

## 主机管理

制作镜像，按照镜像安装，完全保留镜像配置。

## 数据管理

数据不离境（或是region/AZ），通常核心业务数据，必须保留在本地。

## 工具管理

希望运维的操作可以工具化，至少可以支持半自动化。