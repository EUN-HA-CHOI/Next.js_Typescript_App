import fs from 'fs'
import path from "path";
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(),'posts')
//console.log('postsDirectory',postsDirectory);
//process.cwd() = 기본 경로 , join = 주소를 결합 해 주는 역할
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  //동깁식Sync , 비동기식async
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, ''); //pre-rendering
    const fullPath = path.join(postsDirectory, fileName);
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');//파일 내용
    const matterResult = matter(fileContents) //객체변환

    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
} 

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id:string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)//객체 변환

  const processedContent = await remark()//remark는 markdown을 html로 변환
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}