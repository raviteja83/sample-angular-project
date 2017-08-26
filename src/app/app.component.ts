import { Component, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode, TreeModel } from 'angular-tree-component';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    @ViewChild('tree') treeComponent: TreeComponent;
    nodes: any[];
    root: TreeNode;
    total: number = 0;
    costs: object = {
        Manager: 300,
        Developer: 1000,
        QA: 500
    };
    constructor() {}

    ngAfterViewInit() {
        const treeModel: TreeModel = this.treeComponent.treeModel;
        this.root = treeModel.getFirstRoot();
    }
    ngOnInit() {
        this.nodes = [
            {
                name: 'My Department',
                expanded: true,
                children: []
            }
        ];
    }
    showHide(role) {
        const roles = ['My Department', 'Manager'];
        return roles.indexOf(role) === -1;
    }

    getNearestManager(treeNode) {
        if (treeNode.isRoot || treeNode.displayField === 'Manager') {
            return treeNode;
        }
        return this.getNearestManager(treeNode.parent);
    }

    addNode(treeNode: TreeNode, role: string) {
        const parent: TreeNode = this.getNearestManager(treeNode);
        const data = { name: role };
        if (role === 'Manager') {
            data['children'] = [];
        } else {
            data['hasChildren'] = false;
        }
        const index = parent.children.length;
        const newNode: TreeNode = new TreeNode(
            data,
            parent,
            this.treeComponent.treeModel,
            index
        );
        parent.children.push(newNode);
        this.total += this.costs[role];
        this.treeComponent.treeModel.expandAll();
    }
}
