import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { NavItemInterface } from './nav-item.interface';
import { Router } from '@angular/router';

/**
 * Flattened tree node that has been created from a
 * FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  location: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTreeComponent {
  // tslint:disable-next-line: variable-name
  _data: Array<NavItemInterface>;
  @Input() set data(v: Array<NavItemInterface>) {
    this._data = v;
    this.dataSource.data = this.data;
  }
  get data(): Array<NavItemInterface> {
    return this._data ? this._data : [];
  }
  @Output() readonly navigate: EventEmitter<NavItemInterface> =
    new EventEmitter<NavItemInterface>();
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of
   * items from hierarchical data.
   */
  treeFlattener: MatTreeFlattener<NavItemInterface, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener
   * to provide data.
   */
  dataSource: MatTreeFlatDataSource<NavItemInterface, FlatTreeNode>;

  constructor(public router: Router) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource =
      new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  /** Transform the data to something the tree can read. */
  transformer(node: NavItemInterface, level: number) {
    return {
      name: node.name,
      type: node.type,
      location: node.location,
      level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: NavItemInterface) {
    return observableOf(node.children);
  }
}
