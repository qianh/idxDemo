TS_CHANGED=$(git diff --cached --numstat --diff-filter=ACM | grep -F '.ts' | wc -l)

# 对提交的代码中存在未提取的中文文案统一处理
if [ "$TS_CHANGED" -gt 0 ]
then
  TS_FILES_LIST=($(git diff --cached --name-only --diff-filter=ACM | grep -F '.ts'))
  TS_FILES=''
  delim=''
  for item in ${TS_FILES_LIST[@]};do
    TS_FILES=$TS_FILES$delim$item;
    delim=','
  done
  echo "\033[33m 正在检测未提取的中文文案，请稍后 \033[0m"
  kiwi --extract $TS_FILES || exit 1
fi