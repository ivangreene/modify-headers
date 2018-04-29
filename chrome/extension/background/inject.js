(function () {
  let sites = [],
      headers = [],
      rules = [];

  chrome.storage.sync.get('state', (obj) => {
    const state = JSON.parse(obj.state || `{
      "sites": [], "headers": [], "rules": [],
    }`);
    sites = state.sites.map(site => ({ ...site,
      pattern: RegExp(site.pattern) }));
    headers = state.headers;
    rules = state.rules.map(rule => ({ ...rule, match: RegExp(rule.match) }));
  });

  chrome.runtime.onMessage.addListener(function (data) {
    if (data.type === "statechange") {
      sites = data.state.sites.map(site => ({ ...site,
        pattern: RegExp(site.pattern) }));
      headers = data.state.headers;
      rules = data.state.rules.map(rule => ({
        ...rule, match: RegExp(rule.match)
      }));
    }
  });

  chrome.webRequest.onHeadersReceived.addListener(function (request) {

    let count = 0;
    debugger;
    sites.forEach(site => {
      if (site.pattern.test(request.url)) {
        headers.filter(header => header.siteId === site.id)
          .forEach(header => {
            for (let i = 0; i < request.responseHeaders.length; i++) {
              if (request.responseHeaders[i].name === header.header) {
                count++;
                rules.filter(rule => rule.headerId === header.id)
                  .forEach(rule => {
                    request.responseHeaders[i].value =
                      request.responseHeaders[i].value.replace(
                        rule.match, rule.replacement);
                  });
              }
            }
          });
      }
    });
/*
    for (let i = 0; i < sites.length; i++) {
      if (sites[i].pattern.test(request.url)) {
        for (let j = 0; j < request.responseHeaders.length; j++) {
          for (let k = 0; k < sites[i].headers.length; k++) {
            if (request.responseHeaders[j].name === sites[i].headers[k].header) {
              for (let m = 0; m < sites[i].headers[k].rules.length; m++) {
                request.responseHeaders[j].value =
                  request.responseHeaders[j].value.replace(
                    RegExp(sites[i].headers[k].rules[m].match),
                    sites[i].headers[k].rules[m].replacement);
              }
            }
          }
        }
      }
    }
*/
    if (false && request.tabId !== -1 && count > 0) {
      debugger;
      chrome.browserAction.setBadgeText({
        text: `${count}`, tabId: request.tabId
      });
    }
//  console.dir(sites);
//  console.dir(request.responseHeaders);
    return { responseHeaders: request.responseHeaders };
  }, {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame"],
  }, ["blocking", "responseHeaders"]);
}());
