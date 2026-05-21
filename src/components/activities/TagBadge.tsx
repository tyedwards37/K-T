import { TAG_COLORS, TAG_LABELS, type ActivityTag } from '../../types/activity'

interface TagBadgeProps {
  tag: ActivityTag
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag]}`}
    >
      {TAG_LABELS[tag]}
    </span>
  )
}
