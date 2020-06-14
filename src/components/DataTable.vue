<template>
    <div v-loading="loading">
        <el-table
                :data="tableData"
                :span-method="spanMethod"
                border
                style="width: 100%"
                sortable="custom"
                @sort-change="onSortChange"
                :row-class-name="rowClassName"
        >
            <slot>
                <!-- column definitions here -->
            </slot>
        </el-table>
        <el-row type="flex" justify="end" class="mg-top-20">
            <el-pagination v-show="isPaging"
                    background
                    @current-change="renderTable"
                    :current-page.sync="tableConfig.currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="tableConfig.totalElements"
            />
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "DataTable",
        props: {
            logging: {
                type: Boolean,
                default: false
            } /* set true if you want DataTable log running actions. */,

            serverPagination: {
                type: Boolean,
                default: true
            }, /* weather to paging server side or on client side */
            
            isPaging: {
                type: Boolean,
                default: true
            },

            data: Array /* set data for table when use client paging */,

            currentPage: {
                type: Number,
                default: 1
            },
            getTableDataFn: Function,
            spanMethod: Function,
            /* get table data function, this function must return Promise that response data has two field: content, totalElements */
            pageSize: {
                type: Number,
                default: 10
            },

            sortMethod: Function
            /* set sortMethod when use client sort, accept 2 parameters: table data and sort option, must return table data after sort */,

            filterMethod: Function /* client side filter function */,

            filterRequest: Object /* when filter request change , DataTable auto call getTableDataFn to get new data */,

            rowClassName: Function
        },
        data() {
            return {
                tableData: [],
                tableConfig: {
                    totalElements: 0,
                    currentPage: this.currentPage,
                    sort: {
                        sortDirection: "DESC",
                        sortField: ""
                    }
                },
                loading: false
            };
        },
        mounted() {
            this.renderTable();
        },
        watch: {
            /* listen pageSize property is changed then re-render table with new pageSize  */
            pageSize: function () {
                this.log("Chang pageSize : ", this.pageSize);
                this.renderTable();
            },
            /* listen filterRequest property is changed then re-render table with new filterRequest */
            filterRequest: {
                deep: true,
                handler() {
                    this.log("change filterRequest: ", this.filterRequest);
                    this.renderTable();
                }
            }
        },
        methods: {
            log() {
                if (this.logging) {
                    if (arguments.length == 1) {
                        console.log(arguments[0]);
                    } else {
                        console.log(...arguments);
                    }
                }
            },
            /* render data table */
            renderTable() {
                if (this.serverPagination) {
                    this.getData();
                } else {
                    const startIndex = (this.tableConfig.currentPage - 1) * this.pageSize;
                    const endIndex = this.tableConfig.currentPage * this.pageSize;
                    if (this.data.length - 1 >= startIndex) {
                        let temp = this.data;
                        if (this.filterMethod) {
                            temp = this.filterMethod(temp, this.filterRequest);
                        }
                        if (this.sortMethod) {
                            temp = this.sortMethod(temp, this.tableConfig.sort);
                        }
                        this.tableData = temp.slice(startIndex, endIndex);
                    }
                }
            },
            /* get data using getDataTableFn */
            async getData() {
                let pageRequest = {};
                pageRequest.page = this.tableConfig.currentPage;
                pageRequest.pageSize = this.pageSize;
                this.loading = true;
                try {
                    const response = await this.getTableDataFn(
                        pageRequest,
                        this.tableConfig.sort,
                        this.filterRequest
                    );
                    if(this.isPaging){
                        this.tableData = response.content;
                        this.tableConfig.totalElements = response.totalElements;
                    }else{
                        this.tableData = response;
                        this.tableConfig.totalElements = response.length;
                    }
                    
                } catch (e) {
                    console.error(e);
                } finally {
                    this.loading = false;
                }
            },
            /* handler for event change sort option of element ui table. */
            onSortChange(sort) {
                this.log("DataTable change sort option ", sort);
                if (sort.order) {
                    this.tableConfig.sort.sortField = sort.prop;
                    this.tableConfig.sort.sortDirection =
                        sort.order == "ascending" ? "ASC" : "DESC";
                } else {
                    this.tableConfig.sort.sortField = null;
                }
                // get table data with new sort change.
                this.getData();
            },
            /* move to specific page */
            toPage(page) {
                this.log("Move to page ", page);
                this.tableConfig.currentPage = page;
                // get table data with new currentPage
                this.getData();
            },
            /* reload data of current page */
            reload() {
                this.log("Reload DataTable");
                this.getData();
            }
        }
    };
</script>

<style scoped>
</style>
