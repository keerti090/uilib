import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewItemComponent, TreeViewType } from './tree-view-item.component';

export interface TreeViewNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeViewNode[];
  disabled?: boolean;
}

interface FlatNode {
  node: TreeViewNode;
  level: 1 | 2 | 3 | 4;
  expanded: boolean;
  hasChildren: boolean;
  visible: boolean;
}

const DEFAULT_NODES: TreeViewNode[] = [
  {
    id: '1',
    label: 'Parent Item',
    children: [
      {
        id: '1-1',
        label: 'Child Item',
        children: [
          { id: '1-1-1', label: 'Grandchild Item' },
          { id: '1-1-2', label: 'Grandchild Item' },
        ],
      },
      { id: '1-2', label: 'Child Item' },
      { id: '1-3', label: 'Child Item' },
    ],
  },
  { id: '2', label: 'Parent Item' },
  { id: '3', label: 'Parent Item' },
];

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule, TreeViewItemComponent],
  styleUrls: ['./tree-view.scss'],
  template: `
    <div class="AppCore-tree-view" role="tree">
      @for (flat of flatNodes; track flat.node.id) {
        @if (flat.visible) {
          <app-tree-view-item
            class="AppCore-tree-view__item"
            [label]="flat.node.label"
            [level]="flat.level"
            [type]="type"
            [state]="getItemState(flat)"
            [expanded]="flat.expanded"
            [hasChildren]="flat.hasChildren"
            [showPrefixIcon]="showIcons"
            [prefixIcon]="flat.node.icon || 'add'"
            (itemClick)="onItemClick(flat)"
            (expandToggle)="onExpandToggle(flat)"
            role="treeitem"
          ></app-tree-view-item>
        }
      }
    </div>
  `,
})
export class TreeViewComponent implements OnChanges {
  @Input() nodes: TreeViewNode[] = DEFAULT_NODES;
  @Input() type: TreeViewType = 'global';
  @Input() showIcons: boolean = true;
  @Input() selectedId: string | null = null;

  @Output() nodeSelect = new EventEmitter<TreeViewNode>();
  @Output() nodeExpand = new EventEmitter<{ node: TreeViewNode; expanded: boolean }>();

  flatNodes: FlatNode[] = [];
  private expandedIds = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']) {
      this.flatNodes = this.flatten(this.nodes, 1);
    }
    this.updateVisibility();
  }

  getItemState(flat: FlatNode): 'default' | 'disabled' | 'selected' {
    if (flat.node.disabled) return 'disabled';
    if (flat.node.id === this.selectedId) return 'selected';
    return 'default';
  }

  onItemClick(flat: FlatNode): void {
    if (flat.node.disabled) return;
    this.selectedId = flat.node.id;
    this.nodeSelect.emit(flat.node);
  }

  onExpandToggle(flat: FlatNode): void {
    if (flat.expanded) {
      this.expandedIds.delete(flat.node.id);
    } else {
      this.expandedIds.add(flat.node.id);
    }
    flat.expanded = !flat.expanded;
    this.updateVisibility();
    this.nodeExpand.emit({ node: flat.node, expanded: flat.expanded });
  }

  private flatten(
    nodes: TreeViewNode[],
    level: number,
    parentVisible = true
  ): FlatNode[] {
    const result: FlatNode[] = [];
    const clampedLevel = Math.min(level, 4) as 1 | 2 | 3 | 4;

    for (const node of nodes) {
      const hasChildren = !!(node.children && node.children.length > 0);
      const expanded = this.expandedIds.has(node.id);
      const flat: FlatNode = {
        node,
        level: clampedLevel,
        expanded,
        hasChildren,
        visible: parentVisible,
      };
      result.push(flat);

      if (hasChildren) {
        const childFlats = this.flatten(node.children!, level + 1, parentVisible && expanded);
        result.push(...childFlats);
      }
    }
    return result;
  }

  private updateVisibility(): void {
    this.flatNodes = this.flatten(this.nodes, 1);
  }
}
