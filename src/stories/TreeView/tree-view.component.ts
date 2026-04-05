import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeModule,
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { TreeViewItemComponent, TreeViewType } from './tree-view-item.component';

// ── Public types the consumer imports ────────────────────────────────────────

export interface TreeViewNode {
  label: string;
  icon?: string;
  disabled?: boolean;
  children?: TreeViewNode[];
  /** Any extra data the consumer wants to carry through. */
  data?: unknown;
}

/** Flat node produced by MatTreeFlattener — internal use only. */
export interface TreeViewFlatNode {
  label: string;
  icon?: string;
  disabled?: boolean;
  data?: unknown;
  level: number;
  expandable: boolean;
  /** Reference back to the source node for selection tracking. */
  _source: TreeViewNode;
}

// ── Default demo data ─────────────────────────────────────────────────────────

const DEFAULT_NODES: TreeViewNode[] = [
  {
    label: 'Parent Item',
    children: [
      {
        label: 'Child Item',
        children: [
          { label: 'Grandchild Item' },
          { label: 'Grandchild Item' },
        ],
      },
      { label: 'Child Item' },
      { label: 'Child Item' },
    ],
  },
  { label: 'Parent Item' },
  { label: 'Parent Item' },
];

// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule, MatTreeModule, TreeViewItemComponent],
  styleUrls: ['./tree-view.scss'],
  template: `
    <mat-tree
      class="AppCore-tree-view"
      [dataSource]="dataSource"
      [treeControl]="treeControl"
      role="tree"
    >
      <mat-tree-node
        *matTreeNodeDef="let flat"
        class="AppCore-tree-view__node"
        matTreeNodePadding
        [matTreeNodePaddingIndent]="0"
      >
        <app-tree-view-item
          [label]="flat.label"
          [level]="clampLevel(flat.level + 1)"
          [type]="type"
          [state]="stateOf(flat)"
          [hasChildren]="false"
          [showPrefixIcon]="showIcons"
          [prefixIcon]="flat.icon || 'add'"
          (itemClick)="onSelect(flat)"
        ></app-tree-view-item>
      </mat-tree-node>

      <mat-tree-node
        *matTreeNodeDef="let flat; when: hasChild"
        class="AppCore-tree-view__node"
        matTreeNodePadding
        [matTreeNodePaddingIndent]="0"
      >
        <app-tree-view-item
          [label]="flat.label"
          [level]="clampLevel(flat.level + 1)"
          [type]="type"
          [state]="stateOf(flat)"
          [hasChildren]="true"
          [expanded]="treeControl.isExpanded(flat)"
          [showPrefixIcon]="showIcons"
          [prefixIcon]="flat.icon || 'add'"
          (itemClick)="onSelect(flat)"
          (expandToggle)="treeControl.toggle(flat)"
        ></app-tree-view-item>
      </mat-tree-node>
    </mat-tree>
  `,
})
export class TreeViewComponent implements OnChanges {
  /**
   * Hierarchical node data. Provide your own `TreeViewNode[]`
   * — the component handles flattening and expansion internally.
   */
  @Input() nodes: TreeViewNode[] = DEFAULT_NODES;

  /** Visual theme: 'global' (blue-tinted bg) or 'local' (white bg). */
  @Input() type: TreeViewType = 'global';

  /** Show the leading icon on every row. */
  @Input() showIcons: boolean = true;

  /** ID of the currently selected node (matched on object reference via `_source`). */
  @Input() selectedNode: TreeViewNode | null = null;

  /** Emits when the user clicks a non-disabled node. */
  @Output() nodeSelect = new EventEmitter<TreeViewNode>();

  /** Emits when a parent node is expanded or collapsed. */
  @Output() nodeToggle = new EventEmitter<{ node: TreeViewNode; expanded: boolean }>();

  // ── Material tree plumbing ─────────────────────────────────────────────────

  private transformer = (node: TreeViewNode, level: number): TreeViewFlatNode => ({
    label: node.label,
    icon: node.icon,
    disabled: node.disabled,
    data: node.data,
    level,
    expandable: !!(node.children && node.children.length > 0),
    _source: node,
  });

  treeControl = new FlatTreeControl<TreeViewFlatNode>(
    flat => flat.level,
    flat => flat.expandable,
  );

  private flattener = new MatTreeFlattener<TreeViewNode, TreeViewFlatNode>(
    this.transformer,
    flat => flat.level,
    flat => flat.expandable,
    node => node.children ?? [],
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.flattener);

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']) {
      this.dataSource.data = this.nodes;
    }
  }

  // ── Template helpers ───────────────────────────────────────────────────────

  hasChild = (_: number, flat: TreeViewFlatNode): boolean => flat.expandable;

  clampLevel(level: number): 1 | 2 | 3 | 4 {
    return Math.min(Math.max(level, 1), 4) as 1 | 2 | 3 | 4;
  }

  stateOf(flat: TreeViewFlatNode): 'default' | 'selected' | 'disabled' {
    if (flat.disabled) return 'disabled';
    if (flat._source === this.selectedNode) return 'selected';
    return 'default';
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  onSelect(flat: TreeViewFlatNode): void {
    if (flat.disabled) return;
    this.selectedNode = flat._source;
    this.nodeSelect.emit(flat._source);
  }
}
