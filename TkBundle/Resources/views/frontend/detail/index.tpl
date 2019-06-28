{extends file="parent:frontend/detail/index.tpl"}

{block name="frontend_detail_index_detail"}
    {* if product has the tk_bundle attribute: include the detail_listing.tpl *}
    {if $sArticle.attributes.tk_bundle && $sArticle.attributes.tk_bundle->get('has_bundle')}
        {$bundles = $sArticle.attributes.tk_bundle->get('bundles')}
        {include file="frontend/tk_bundle/detail_listing.tpl" bundles=$bundles}
    {/if}
    {$smarty.block.parent}
{/block}
