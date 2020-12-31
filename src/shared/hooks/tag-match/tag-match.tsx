type WithFrontmatterTagType<T> = {
  frontmatter?: { tags?: (string | undefined | null)[] | null } | null
} & T

const tagMatch = function <T = any>(
  all: WithFrontmatterTagType<T>[],
  tag?: string | null
): T[] {
  return all.filter((one) =>
    tag === null || tag === undefined
      ? true
      : one.frontmatter?.tags?.includes(tag)
  )
}

export default tagMatch
