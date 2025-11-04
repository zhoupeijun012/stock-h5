# 基于官方Nginx 1.25.3 Alpine镜像（已支持HTTP/3）
FROM nginx:1.25.3-alpine

COPY default.conf /etc/nginx/conf.d/default.conf

# 复制前端静态文件
COPY . /usr/share/nginx/html/

# 暴露端口（TCP和UDP）
EXPOSE 12346

# 启动Nginx（使用官方镜像的默认CMD）