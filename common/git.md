# Git 常用命令

## Git rebase - 二次开发项目升级

在分叉仓库的本地克隆中,你可以添加原始的 GitHub 仓库作为 "远程"。("remote "就像仓库的 URL 的昵称,比如 origin 就是一个。)然后你就可以从该上游仓库获取所有分支,并重新建立你的工作,继续在上游版本上工作。在命令方面,这可能看起来像。
添加远程,称其为 "上游"。

```
git remote add upstream https://github.com/jzfai/vue3-admin-plus
```

将该远程的所有分支提取到远程跟踪的分支中,比如upstream/master。

```
git fetch upstream
From https://github.com/jzfai/vue3-admin-plus
 * [new branch]      master     -> ups/master
 * [new branch]      vuex4      -> ups/vuex4
 * [new tag]         v1.5.5     -> v1.5.5
```


确保你在你的主分支上。
```
git checkout master
```

重写你的主干分支,使你的任何尚未在上游/主干中的提交都在其他分支之上重放。
```
git rebase upstream/master (or git rebase v1.5.5)
```

如果你不想改写主干分支的历史,(例如因为其他人可能已经克隆了它),那么你应该用git merge upstream/master替换最后一条命令。然而,为了使进一步的拉取请求尽可能的干净,最好还是重新建立。
如果你已经将你的分支重新建立到上游/主干,你可能需要强制推送,以便将其推送到 GitHub 上你自己的分叉仓库。你可以这样做

```
git push -f origin master
```

你只需要在重新编译后的第一次使用-f。
