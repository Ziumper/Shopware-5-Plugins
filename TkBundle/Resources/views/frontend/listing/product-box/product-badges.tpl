{extends file="parent:frontend/listing/product-box/product-badges.tpl"}

{block name="frontend_listing_box_article_new"}
    {$smarty.block.parent}
    {* if the attribute tk_bundle is available: include listing_badge.tpl *}
    {if $sArticle.attributes.tk_bundle && $sArticle.attributes.tk_bundle->get('has_bundle')}
        {include file="frontend/tk_bundle/listing_badge.tpl"}
    {/if}
{/block}
