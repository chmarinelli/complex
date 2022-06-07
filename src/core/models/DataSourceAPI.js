export default class DataSourceAPI {

    /**
     * Items read so far
     *
     * NOTE: as vue is reactive, updating it here should trigger UI updates
     *
     * @member {object[]}
     */
    items = []
  
    /**
     * Indicates if there are more items to fetch from database in "isLoadingMore" calls
     *
     * @member {boolean}
     */
    hasMore = true
  
    /**
     * Searches for elements that fit the search parameters and stores them in this object
     *
     * @param {string} term
     * @param {boolean} isLoadingMore
     * @returns {Promise<object[]>}
     */
    async search(term, isLoadingMore = false) {
      throw new TypeError('Do not call abstract method.')
    }
  
    /**
     * Searches for elements that satisfy a list of terms and stores them in this object
     *
     * @param {string[]} terms
     * @returns {Promise<object[]>}
     */
    async searchMany(terms) {
      throw new TypeError('Do not call abstract method.')
    }
  
    /**
     * Retrieves a term currently cached in the data source, with no network request. Useful to avoid some network calls when
     * presenting a list with values previously queried
     *
     * NOTE FOR CHALLENGE: for a user structure, "termFieldKey" would be a key like "username" or "e-mail", while 'termValue" is an
     * actual username or e-mail that you want to find in the items array.
     *
     * @param {string} termValue - the value of the termField key in the object (termField key was set in the constructor)
     * @returns {object}
     */
    get(termValue) {
      throw new TypeError('Do not call abstract method.')
    }
  }