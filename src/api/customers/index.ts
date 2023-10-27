import type { Customer, CustomerEmail, CustomerInvoice, CustomerLog } from 'src/types/customer';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import { customer, customers, emails, invoices, logs } from './data';
import axios from 'axios';

type GetCustomersRequest = {
  filters?: {
    query?: string;
    hasAcceptedMarketing?: boolean;
    isProspect?: boolean;
    isReturning?: boolean;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetCustomersResponse = Promise<{
  data: Customer[];
  count: number;
}>;

type GetCustomerRequest = object;

type GetCustomerResponse = Promise<Customer>;

type GetCustomerEmailsRequest = object;

type GetCustomerEmailsResponse = Promise<CustomerEmail[]>;

type GetCustomerInvoicesRequest = object;

type GetCustomerInvoicesResponse = Promise<CustomerInvoice[]>;

type GetCustomerLogsRequest = object;

type GetCustomerLogsResponse = Promise<CustomerLog[]>;

class CustomersApi {
  getCustomers(request: GetCustomersRequest = {}): GetCustomersResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(customers) as Customer[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((customer) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties: ('email' | 'name')[] = ['email', 'name'];

          properties.forEach((property) => {
            if (customer[property].toLowerCase().includes(filters.query!.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.hasAcceptedMarketing !== 'undefined') {
          if (customer.hasAcceptedMarketing !== filters.hasAcceptedMarketing) {
            return false;
          }
        }

        if (typeof filters.isProspect !== 'undefined') {
          if (customer.isProspect !== filters.isProspect) {
            return false;
          }
        }

        if (typeof filters.isReturning !== 'undefined') {
          if (customer.isReturning !== filters.isReturning) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  async getCustomer(request?: GetCustomerRequest): GetCustomerResponse {
    const config = {
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZDg4NmRhYS03NGNmLTQzMjQtOTFiNy00OGU5YjAyNWEwMjgiLCJ0eXBlIjoiaWQiLCJlbWFpbCI6ImFsaXNoYWg0MDQ0MEBnbWFpbC5jb20iLCJpYXQiOjE2OTgzNDMzMzgsImV4cCI6MTY5ODM0NjkzOH0.ZyMUj1ew6MtX1a4-R1FzXiNYP3uqF2-ygvPWfaczpCI` }
    };
    const resp= await axios.get('https://gnx5mqqz88.execute-api.us-east-2.amazonaws.com/auth/me',config)
    return Promise.resolve(deepCopy(resp.data));
  }

  getEmails(request?: GetCustomerEmailsRequest): GetCustomerEmailsResponse {
    console.log("iam in")
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request?: GetCustomerInvoicesRequest): GetCustomerInvoicesResponse { //
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request?: GetCustomerLogsRequest): GetCustomerLogsResponse {
    return Promise.resolve(deepCopy(logs));
  }
}

export const customersApi = new CustomersApi();
