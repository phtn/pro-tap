'use client'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'

import {IFAQ} from '@/app/types/landing'
import {siteDetails} from './site-details'

import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {SmartIntro} from './smart-intro'

export const FAQ = () => {
  return (
    <section id='faq' className='py-16 lg:py-20 px-2 w-full'>
      <div className='flex flex-col gap-10'>
        <div className='px-2'>
          <SmartIntro />
        </div>

        <div className='w-full md:max-w-2xl lg:max-w-full group'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=' first:border-t border-b group-hover:border-transparent border-origin/60 hover:border-origin/80 last:border-b-0 font-figtree'>
              <Disclosure>
                {({open}) => (
                  <div>
                    <DisclosureButton
                      className={cn(
                        'font-figtree w-full flex items-center justify-between cursor-pointer px-4 py-6 md:py-8 text-lg text-left',
                        ' hover:bg-origin/50',
                        ' transition-all duration-50',
                        {'bg-origin/20': open},
                      )}>
                      <span
                        className={cn(
                          'text-lg md:text-xl font-semibold tracking-tighter',
                          {'dark:text-orange-200 text-orange-400': open},
                        )}>
                        {faq.question}
                      </span>
                      {open ? (
                        <Icon
                          name='close'
                          className='w-5 h-5 dark:text-orange-300 text-orange-400'
                        />
                      ) : (
                        <Icon name='add' className='w-5 h-5 text-primary' />
                      )}
                    </DisclosureButton>
                    <DisclosurePanel
                      className={cn(
                        'px-4 py-4 text-foreground-accent leading-8',
                        {'bg-origin/20': open},
                      )}>
                      {faq.answer}
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const faqs: IFAQ[] = [
  {
    question: `What exactly is ${siteDetails.siteName}?`,
    answer: `${siteDetails.siteName} combines integration and protection in one smart solution. It offers a modern way to exchange business cards digitally while also providing personal accident insurance coverage for added security.`,
  },
  {
    question: `What is a Digital Business Card?`,
    answer:
      'A digital business card is a modern tool for sharing contact information conveniently. It allows you to quickly and easily exchange details such as your name, company, job title, phone number, email, website, and social media links.',
  },
  {
    question:
      'What are the most common benefits of using a digital business card?',
    answer: `Digital business cards offer several benefits, including convenience, security, and accessibility. They allow you to quickly and easily exchange contact information, ensuring that your details are always up-to-date and accurate. Additionally, digital business cards provide a secure way to share sensitive information, such as your email address or phone number, without the risk of it being intercepted or stolen. Finally, digital business cards are accessible from anywhere, at any time, making it easy to stay connected with your contacts and network.`,
  },
  {
    question: 'What is the Protection Coverage Under Protap?',
    answer:
      'Protap offers personal accident insurance that provides financial protection against unexpected accidents.',
  },
]
