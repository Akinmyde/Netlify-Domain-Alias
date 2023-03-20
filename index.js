const getAndUpdateDomainAlias = async newDomainAlias => {
    const siteId = 'YOUR_NETLIFY_SITE_ID';
    const accessToken = 'YOUR_NETLIFY_ACCESS_TOEKN';
    const url = `https://api.netlify.com/api/v1/sites/${siteId}`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    // Get Netlify Site to read existing domain aliases
    const siteInformation = await fetch(url, { method: 'GET', headers });
    const sites = await siteInformation.json();
    //   If Netlify Site does not have the domain alias we want to add
    const currentDomainAliases = sites.domain_aliases;
    if (!currentDomainAliases.includes(newDomainAlias)) {
        // Update the Netlify Site to include the domain alias we want to add
        const newDomainAlias = {
            domain_aliases: [...currentDomainAliases, domainAlias],
        };

        const body = JSON.stringify({ domain_aliases: newDomainAlias }) 
        await fetch(url, { method: 'PATCH',  headers, body });
    }
}
