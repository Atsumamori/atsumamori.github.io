---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title_ongoing: Ongoing Shiny Hunts
---

# Welcome

Custom text here.

{% for hunt in site.data.currentHunts %}
- {{ hunt.version }}
{% endfor %}