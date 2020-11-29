import { Category, Project, Task } from '@/Models'
import { sendResp } from '@/Utils'
import { addCategoryToProject } from './categories'
import { addTaskToCategory } from './tasks'

export async function initMyProject(req, res, next) {
  const userId = req.user.id
  await initProject(userId)
  sendResp(res, null)
}

/**
 * 删除项目及其关联
 */
export async function initProject(userId) {
  const pj = await Project.findOne({ owner: userId, delete: false })
  if (pj != null) return

  // 创建项目
  const project = await Project.create({
    title: '默认项目',
    description: '欢迎使用项目看板',
    imageUrl: 'https://img.awesomes.cn/thumbs/told/1503527717089-2339-2298.png',
    owner: userId
  })
  const projectId = project.id

  // 创建分组
  const categories = await Category.create([
    {
      title: '分组1',
      project: projectId,
      owner: userId
    },
    {
      title: '分组2',
      project: projectId,
      owner: userId
    }
  ])
  await addCategoryToProject(
    projectId,
    categories.map(e => e.id)
  )
  const categoryId = categories[0].id

  // 创建任务
  const tasks = await Task.create([
    {
      title: '任务1',
      description: '描述一下吧',
      project: projectId,
      category: categoryId,
      owner: userId
    },
    {
      title: '任务2',
      description: '描述一下吧',
      project: projectId,
      category: categoryId,
      owner: userId
    }
  ])
  await addTaskToCategory(
    categoryId,
    tasks.map(e => e.id)
  )
}
